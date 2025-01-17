﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseAPI.Model;


namespace WarehouseAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly WarehouseContext context;

        public ProductController(WarehouseContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Product> GetProducts(string name, string number, string location, string sort, int? id, int? page, int length = 100, string dir = "asc")
        {
            IQueryable<Product> query = context.Products;

            if (id.HasValue)
                query = query.Where(d => d.Id == id);
            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name == name);
            if (!string.IsNullOrWhiteSpace(number))
                query = query.Where(d => d.Number == number);
            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(d => d.Location == location);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Name);
                        break;
                    case "number":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Number);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Number);
                        break;
                    case "location":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Location);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Location);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return query.Include(Product => Product.ProductOrders).ThenInclude(Order => Order.Order).ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetProduct(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpPost]
        public IActionResult NewProduct([FromBody] Product newProduct)
        {
            if (newProduct.Id != 0)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            context.Products.Add(newProduct);
            context.SaveChanges();
            return Created("", newProduct);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
                return NotFound();

            context.Products.Remove(product);
            context.SaveChanges();
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateProduct([FromBody] Product updateProduct)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = context.Products.Find(updateProduct.Id);
            if (product == null)
                return NotFound();

            product.Name = updateProduct.Name;
            product.Description = updateProduct.Description;
            product.Number = updateProduct.Number;
            product.Price = updateProduct.Price;
            product.Location = updateProduct.Location;

            context.SaveChanges();
            return Ok(product);
        }
    }
}
