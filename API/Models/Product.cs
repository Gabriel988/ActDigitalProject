using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GeneralTools.Models
{
    public partial class Product()
    {
        /// <summary>
        /// Id do produto
        /// </summary>
        [Key]
        public int? Id { get; set; }

        /// <summary>
        /// Nome do produto
        /// </summary>
        [MaxLength(100)]
        public string? Nome { get; set; }

        /// <summary>
        /// Descrição do Produto
        /// </summary>
        [MaxLength(255)]
        public string? Descricao { get; set; }

        /// <summary>
        /// Data de cadastro
        /// </summary>
        public DateTime? DataCadastro { get; set; }

        /// <summary>
        /// Preço do produto
        /// </summary>
        public decimal? Preco { get; set; }

        /// <summary>
        /// Quantidade no estoque
        /// </summary>
        public int? QuantidadeEstoque { get; set; }

        /// <summary>
        /// Categoria do produto
        /// </summary>
        [MaxLength(100)]
        public string? Categoria { get; set; }

        /// <summary>
        /// Status do produto: Ativo ou Inativo
        /// </summary>
        public bool Status { get; set; } = true;

    }
}
