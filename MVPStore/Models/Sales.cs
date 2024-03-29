﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace MVPStore.Models
{
    public partial class Sales
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Id is required")]
        public int? ProductId { get; set; }

        [Required(ErrorMessage = "Customer Id is required")]
        public int? CustomerId { get; set; }

        [Required(ErrorMessage = "Store Id is required")]
        public int? StoreId { get; set; }

        [Required(ErrorMessage = "Date Sold is required")]
        public DateTime DateSold { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
