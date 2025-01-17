﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseAPI.Model
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public string Name { get; set; }
        [StringLength(2000)]
        public string Description { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        [Range(0.0, 100000.0)]
        public double Price { get; set; }
        public ICollection<ProductOrder> ProductOrders { get; set; }
    }
}
