﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarehouseAPI.Model
{
    public class Order
    {
        public int Id { get; set; }

        public Product Product { get; set; }
        public User User { get; set; }

        public int Amount { get; set; }
    }
}
