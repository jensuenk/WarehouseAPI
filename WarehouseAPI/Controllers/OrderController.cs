using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
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
        public List<User> GetOrders()
        {

            //return this.context.Users.Include(o => o.Orders).ToList();
            return this.context.Orders.ToList();

        }
    }
}
