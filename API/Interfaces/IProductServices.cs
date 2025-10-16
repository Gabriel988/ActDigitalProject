using GeneralTools.Models;

namespace GeneralTools.Interfaces
{
    public interface IProductServices
    {
        public Task<List<Product>> ListProduct(string? status);
        Task SaveProduct(Product product);
        public void UpadateProduct(Product product);
        public Product GetProduct(int id);
        public void DeleteProduct(int id);
    }
}
