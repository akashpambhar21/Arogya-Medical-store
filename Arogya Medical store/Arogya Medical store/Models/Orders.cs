namespace Arogya_Medical_store.Models
{
    public class Orders
    {
        public int ID { get; set; }
        public int UserID { get; set; }

        public string MedicineName { get; set; }
        public int MedicineID { get; set; }
        public decimal OrderTotal { get; set; }

    }
}
