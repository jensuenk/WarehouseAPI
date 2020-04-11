using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WarehouseAPI.Model;

namespace WarehouseAPI
{
    public class WarehouseContext: DbContext
    {
        public WarehouseContext(DbContextOptions<WarehouseContext> options) : base(options)
        {

        }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
