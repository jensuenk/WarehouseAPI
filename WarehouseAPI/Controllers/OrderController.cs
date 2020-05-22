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
        public List<Order> GetOrders(string date, string sort, int? id, int? page, int length = 100, string dir = "asc")
        {
            IQueryable<Order> query = context.Orders;

            if (id.HasValue)
                query = query.Where(d => d.Id == id);
            if (!string.IsNullOrWhiteSpace(date))
                query = query.Where(d => d.Date.ToString() == date);

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
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return query.Include(d => d.UserId).Include(Order => Order.ProductOrders).ThenInclude(Product => Product.Product).ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetOrder(int id)
        {
            var order = context.Orders.Include(d => d.UserId).SingleOrDefault(d => d.Id == id);

            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [HttpPost]
        public IActionResult NewOrder([FromBody] Order newOrder)
        {
            if (newOrder.Id != 0)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = context.Orders.Find(updateOrder.Id);
            if (order == null)
                return NotFound();

            order.UserId = updateOrder.UserId;
            order.Date = updateOrder.Date;

            context.SaveChanges();
            return Ok(order);
        }
    }
}
