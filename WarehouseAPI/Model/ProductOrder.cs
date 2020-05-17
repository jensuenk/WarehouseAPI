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
        public int ProductId { get; set; }
        [Key]
        public Product Product { get; set; }
        [Required]
        public int OrderId { get; set; }
        [Required]
        public Order Order { get; set; }
    }
}
