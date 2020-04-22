using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WarehouseAPI.Model;

namespace WarehouseAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly WarehouseContext context;

        public UserController(WarehouseContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<User> GetUsers(string name, string firstName, string email, string address, string sort, int? page, int length = 2, string dir = "asc")
        {
            IQueryable<User> query = context.Users;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name == name);
            if (!string.IsNullOrWhiteSpace(firstName))
                query = query.Where(d => d.FirstName == firstName);
            if (!string.IsNullOrWhiteSpace(email))
                query = query.Where(d => d.Email == email);
            if (!string.IsNullOrWhiteSpace(address))
                query = query.Where(d => d.Address == address);

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
                    case "firstName":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.FirstName);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.FirstName);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return query.ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetUser(int id)
        {
            var user = context.Users.Find(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public IActionResult NewUser([FromBody] User newUser)
        {
            context.Users.Add(newUser);
            context.SaveChanges();
            return Created("", newUser);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            var user = context.Users.Find(id);
            if (user == null)
                return NotFound();

            context.Users.Remove(user);
            context.SaveChanges();
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateUsert([FromBody] User updateUser)
        {
            var user = context.Users.Find(updateUser.Id);
            if (user == null)
                return NotFound();

            user.Name = updateUser.Name;
            user.FirstName = updateUser.FirstName;
            user.Email = updateUser.Email;
            user.Address = updateUser.Address;
            user.Tel = updateUser.Tel;

            context.SaveChanges();
            return Ok(user);
        }
    }
}
