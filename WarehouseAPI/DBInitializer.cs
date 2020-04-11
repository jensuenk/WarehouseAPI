using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarehouseAPI.Model;

namespace WarehouseAPI
{
    public class DBInitializer
    {
        public static void Initialze(WarehouseContext context)
        {
            context.Database.EnsureCreated();

            Product product = null;
            if (!context.Products.Any())
            {
                product = new Product
                {
                    Name = "Logitec G502 Mouse",
                    Description = "placeholder description",
                    Location = "10A2B",
                    Price = 59.99
                };
                context.Products.Add(product);
            }

            User user = null;
            if (!context.Users.Any())
            {
                user = new User
                {
                    Name = "Jansens",
                    FirstName = "Dirk",
                    Email = "random@email.com",
                    Address = "address here",
                    Tel = "238271262891"
                    // TODO: Add order
                };
            };
            context.Users.Add(user);


            Order order = null;
            if (!context.Orders.Any())
            {
                order = new Order
                {
                    Product = product,
                    User = user,
                    Amount = 1
                };
                context.Orders.Add(order);


                context.SaveChanges();
            }

        }
    }
}
