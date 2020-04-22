using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseAPI.Model;

namespace WarehouseAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly WarehouseContext context;

        public OrderController(WarehouseContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Order> GetOrders(string date, User user, Product product, string sort, int? page, int length = 2, string dir = "asc")
        {
            IQueryable<Order> query = context.Orders;

            if (!string.IsNullOrWhiteSpace(date))
                query = query.Where(d => d.Date.ToString() == date);
            if (user != null)
                query = query.Where(d => d.UserId == user);
            if (product != null)
                query = query.Where(d => d.ProductId == product);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "date":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Date);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Date);
                        break;
                    case "user":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.UserId);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.UserId);
                        break;
                    case "product":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.ProductId);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.ProductId);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return query.Include(d => d.UserId).Include(d => d.ProductId).ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetOrder(int id)
        {
            var order = context.Orders.Include(d => d.UserId)
                .Include(d => d.ProductId)
                .SingleOrDefault(d => d.Id == id);
             
            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [HttpPost]
        public IActionResult NewOrder([FromBody] Order newOrder)
        {
            context.Orders.Add(newOrder);
            context.SaveChanges();
            return Created("", newOrder);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteOrder(int id)
        {
            var order = context.Orders.Find(id);
            if (order == null)
                return NotFound();

            context.Orders.Remove(order);
            context.SaveChanges();
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateProduct([FromBody] Order updateOrder)
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            var order = context.Orders.Find(updateOrder.Id);
            if (order == null)
                return NotFound();

            order.UserId = updateOrder.UserId;
            order.ProductId = updateOrder.ProductId;
            order.Amount = updateOrder.Amount;
            order.Date = updateOrder.Date;

            context.SaveChanges();
            return Ok(order);
        }
    }
}
