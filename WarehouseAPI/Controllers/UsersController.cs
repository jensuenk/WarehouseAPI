﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
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
        public List<User> GetUsers()
        {

            //return this.context.Users.Include(o => o.Orders).ToList();
            return this.context.Users.ToList();

        }
    }
}
