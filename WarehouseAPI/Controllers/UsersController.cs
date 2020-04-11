using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WarehouseAPI;
using WarehouseAPI.Model;

namespace WarehouseAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly WarehouseContext context;

        public UsersController(WarehouseContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<User> GetBooks()
        {

            //return this.context.Users.Include(o => o.Orders).ToList();
            return this.context.Users.ToList();

        }
    }
}
