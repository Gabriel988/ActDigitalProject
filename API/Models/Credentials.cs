
using System.ComponentModel.DataAnnotations;

namespace GeneralTools.Models
{
    public partial class Credentials
    {

        /// <summary>
        /// Id do produto
        /// </summary>
        [Key]
        public int? Id { get; set; }

        public string User { get; set; }

        public string Password { get; set; }

    }
}
