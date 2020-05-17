using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseAPI.Model
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public User UserId { get; set; }
        [Required]
        public DateTime Date { get; set; }

        public ICollection<ProductOrder> ProductOrders { get; set; }
    }
}
