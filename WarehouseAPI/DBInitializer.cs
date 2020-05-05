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
                };
                context.Users.Add(user);
                user = new User
                {
                    Name = "Verhelst",
                    FirstName = "Frans",
                    Email = "random@email.com",
                    Address = "address here",
                    Tel = "238271262891"
                };
                context.Users.Add(user);
            };


            Order order = null;
            if (!context.Orders.Any())
            {
                order = new Order
                {
                    //ProductId = product,
                    UserId = user,
                    //Total = 1,
                    Date = DateTime.Now
                };
                context.Orders.Add(order);
            }
            Product product = null;
            if (!context.Products.Any())
            {
                product = new Product
                {
                    Number = "23131",
                    Name = "Logitec G502 Mouse",
                    Description = "placeholder description",
                    Location = "10A2B",
                    Price = 59.99
                };
                /*
                context.Products.Add(product);
                product = new Product
                {
                    Number = "83292",
                    Name = "Lego Crane",
                    Description = "placeholder description",
                    Location = "11A1C",
                    Price = 109.99
                };
                */
                context.Products.Add(product);
            }
            ProductOrder productorder = null;
            if (!context.ProductOrders.Any())
            {
                productorder = new ProductOrder
                {
                    ProductId = product,
                    OrderId = order
                };
                /*
                context.Products.Add(product);
                product = new Product
                {
                    Number = "83292",
                    Name = "Lego Crane",
                    Description = "placeholder description",
                    Location = "11A1C",
                    Price = 109.99
                };
                */
                context.ProductOrders.Add(productorder);
            }

            context.SaveChanges();
        }
    }
}
