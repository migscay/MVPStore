using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace MVPStore.Models
{
    //[Bind(Exclude = "Id")]
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(100, MinimumLength = 5)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Customer Address is required")]
        [StringLength(150, MinimumLength = 5)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
