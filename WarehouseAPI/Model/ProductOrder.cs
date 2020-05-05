using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseAPI.Model
{
    public class ProductOrder
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Product ProductId { get; set; }
        [Required]
        public Order OrderId { get; set; }
        /*
        [Required]
        [Range(0.0, 1000.0)]
        public double Amount { get; set; }
        [Required]
        [Range(0.0, 1000.0)]
        public double TotalPrice { get; set; }
        */
    }
}
