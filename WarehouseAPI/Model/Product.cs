using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseAPI.Model
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public string Location { get; set; }
        [Range(0.0, 100000.0)]
        public double Price { get; set; }
    }
}
