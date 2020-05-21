using Microsoft.EntityFrameworkCore;
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
            // Delete DB if it exists 
            //context.Database.EnsureDeleted();

            context.Database.EnsureCreated();

            User user = null;
            if (!context.Users.Any())
            {
                user = new User
                {
                    Name = "Jansens",
                    FirstName = "Dirk",
                    Email = "jansensdirk@email.com",
                    Address = "Heirbaan 71, 2070 Zwijndrecht",
                    Tel = "0471831152"
                };
                context.Users.Add(user);
                user = new User
                {
                    Name = "Verhelst",
                    FirstName = "Frans",
                    Email = "fransverhelst@email.com",
                    Address = "Jan Frans Faveletstraat 19, 9120 Kallo",
                    Tel = "0476891456"
                };
                context.Users.Add(user);
            };

            Order order = null;
            if (!context.Orders.Any())
            {
                order = new Order
                {
                    UserId = user,
                    Date = DateTime.Now
                };
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
            }

            if (!context.Products.Any() && !context.Orders.Any())
            {
                ProductOrder productOrder = new ProductOrder
                {
                    Product = product,
                    Order = order
                };
                order.ProductOrders = new List<ProductOrder>();
                order.ProductOrders.Add(productOrder);

                product.ProductOrders = new List<ProductOrder>();
                product.ProductOrders.Add(productOrder);
                context.Products.Add(product);
                context.Orders.Add(order);

                context.ProductOrders.Add(productOrder);

                context.SaveChanges();
            }
        }
    }
}
