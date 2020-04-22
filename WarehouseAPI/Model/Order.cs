using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseAPI.Model
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public Product ProductId { get; set; }
        [Required]
        public User UserId { get; set; }
        [Range(0.0, 100000.0)]
        public int Amount { get; set; }
    }
}
