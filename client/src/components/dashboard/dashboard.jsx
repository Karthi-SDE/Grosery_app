import React, { useState, useEffect } from "react";
import axios from "axios";
import {  message } from 'antd';
import "./Dashboard.css";

function UserProfile() {
  let currentuser = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // number of items per page
  const [totalItems, setTotalItems] = useState(0);

  const [editedItemDetails, setEditedItemDetails] = useState({
    name: "",
    brand_name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [newItemDetails, setNewItemDetails] = useState({
    name: "",
    brand_name: "",
    category: "",
    price: "",
    image_url: "",
    quantity: "",
    status: "active",
  });
  const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const endpoint =
        currentuser.role == "admin"
          ? `api/v1/admin/all-items?page=${currentPage}&limit=${pageSize}`
          : `api/v1/user/available-items?page=${currentPage}&limit=${pageSize}`;
      try {
        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if(response.data && !response.data.success){
          message.success(response.data.message)
        }
        setTotalItems(response.data.totalItem)
        const initialCart = {};
        response.data.items.forEach((item) => {
          initialCart[item.id] = 0;
        });
        
        setItems([...response.data.items]);
        setCartItems(initialCart);
        setLoading(false);
      } catch (error) {
          message.success(error.message)
        
        setLoading(false);
      }
    }

    let user = JSON.parse(localStorage.getItem("user"));
    // Check if user is admin
    setIsAdmin(user.role === "admin");
    fetchItems();

    return () => {
      // Cleanup logic here
    };
  }, [isAdmin]);

  const handleQuantityChange = (itemId, value) => {
    const newCartItems = { ...cartItems };
    newCartItems[itemId] =
      newCartItems[itemId] + value >= 0 ? newCartItems[itemId] + value : 0;
    setCartItems(newCartItems);
  };
  const toggleAddItemForm = () => {
    setIsAddItemFormOpen(!isAddItemFormOpen);
  };

  const handleAddToCart = async () => {
    const carts = Object.keys(cartItems).map((itemId) => ({
      itemId: parseInt(itemId),
      quantity: cartItems[itemId],
    }));

    try {
      const response = await axios.post(
        "api/v1/user/addToCart",
        {
          carts,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if(response.data && !response.data.success){
        message.success(response.data.message)
      }
      console.log("Add to cart response:", response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
        message.error(error.message)
      console.error("Error adding to cart:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.put(
        `api/v1/admin/delete-items/${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if(response.data && !response.data.success){
        message.success(response.data.message)
      }

      // Remove the item from the items list
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

      console.log("Delete item response:", response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {

        message.error(error.message)

    }
  };
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditItem = async (itemId) => {
    // Here you can navigate to an edit page or show a modal to edit the item details
    // For now, we'll just log a message
    console.log(`Editing item with ID: ${itemId}`);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItemDetails({
      ...editedItemDetails,
      [name]: value,
    });
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const requestBody = {
        grocery: {
          ...editedItemDetails,
          quantity: cartItems[editedItem.id] || 0, // Assuming you also want to update quantity
        },
      };
      const response = await axios.put(
        `api/v1/admin/items/${editedItem.id}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if(response.data && !response.data.success){
        message.success(response.data.message)
      }else{
        message.success('update successfully')
      }

      // Update the items list with the edited item
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editedItem.id ? { ...item, ...editedItemDetails } : item
        )
      );

      // Close the edit modal
      toggleEditModal();

      console.log("Edit item response:", response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
        message.error(error.message)
      
    }

    console.log("handleEditSubmit finished"); // Log at the end
  };
  const handleInputChangeForNewItem = (e) => {
    const { name, value } = e.target;

    setNewItemDetails({
      ...newItemDetails,
      [name]: value,
    });
  };
  const totalPages = Math.ceil(totalItems / pageSize);

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

  const handleAddItemSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(
        "http://localhost:3006/api/v1/admin/additem",
        {
          grocery: newItemDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if(response.data && !response.data.success){
        message.error(response.data.message)
      }else{
          message.success('added successfully')
        
      }
      const newItem = response.data.grocery;

      // Update the items list with the newly added item
      toggleAddItemForm();
      // Handle success (e.g., show a success message)

      // Clear the newItemDetails state
      setNewItemDetails({
        name: "",
        brand_name: "",
        category: "",
        price: "",
        image_url: "",
        quantity: "",
        status: "active",
      });
    } catch (error) {
        message.error(error.message)

    }

    console.log("handleAddItemSubmit finished");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="items-container">
      <h2>Items</h2>
      {console.log("currentuser", currentuser)}
      {currentuser.role === "admin" && (
        <>
          <button onClick={toggleAddItemForm} className="toggle-add-item-btn">
            {isAddItemFormOpen ? "Hide Add Item Form" : "Add New Item"}
          </button>

          {isAddItemFormOpen && (
            <div className="add-item-form">
              <h2>Add New Item</h2>
              <form onSubmit={handleAddItemSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newItemDetails.name}
                    onChange={handleInputChangeForNewItem}
                  />
                </div>
                <div>
                  <label>Brand:</label>
                  <input
                    type="text"
                    name="brand_name"
                    value={newItemDetails.brand_name}
                    onChange={handleInputChangeForNewItem}
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <select
                    name="category"
                    value={newItemDetails.category}
                    onChange={handleInputChangeForNewItem}
                  >
                    <option value="">Select Category</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="snack">snack</option>
                    <option value="staples">staples</option>
                    <option value="dairy">Dairy</option>
                    <option value="beverage">beverage</option>
                  </select>
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={newItemDetails.price}
                    onChange={handleInputChangeForNewItem}
                  />
                </div>
                <div>
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image_url"
                    value={newItemDetails.image_url}
                    onChange={handleInputChangeForNewItem}
                  />
                </div>
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newItemDetails.quantity}
                    onChange={handleInputChangeForNewItem}
                  />
                </div>
                <button type="submit">Add Item</button>
              </form>
            </div>
          )}
        </>
      )}
      {/* //==== */}
      {currentuser.role == "admin" ? (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item) => {
                  console.log("Current item:", item);
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.brand_name}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td className="action-buttons">
                        <button onClick={() => handleDeleteItem(item.id)}>
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setEditedItem(item);
                            setEditedItemDetails({
                              name: item.name,
                              brand_name: item.brand_name,
                              category: item.category,
                              price: item.price.toString(),
                              quantity: item.quantity.toString(),
                            });
                            toggleEditModal();
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No items found..</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="edit-modal">
              <h2>Edit Item</h2>
              <form onSubmit={(e) => handleEditSubmit(e)}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editedItemDetails.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Brand:</label>
                  <input
                    type="text"
                    name="brand_name"
                    value={editedItemDetails.brand_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <select
                    name="category"
                    value={editedItemDetails.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="snack">snack</option>
                    <option value="staples">staples</option>
                    <option value="dairy">Dairy</option>
                    <option value="beverage">beverage</option>
                  </select>
                </div>
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editedItemDetails.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={editedItemDetails.price}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={toggleEditModal}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <div className="item-card" key={item.id}>
              <img
                src={item.image_url}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>
                  <strong>Brand:</strong> {item.brand_name}
                </p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{cartItems[item.id] || 0}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    {/* Pagination */}
    {totalPages > 1 && (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    )}
    </div>
  );
}

export default UserProfile;
