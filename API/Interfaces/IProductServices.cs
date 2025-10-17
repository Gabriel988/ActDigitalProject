using GeneralTools.Models;

namespace GeneralTools.Interfaces
{
    public interface IProductServices
    {
        Task<List<Product>> ListProduct(string? nome);
        Task SaveProduct(Product product);
        Task UpadateProduct(Product product);
        Task<Product> GetProduct(int id);
        Task DeleteProduct(int id);
    }
}
