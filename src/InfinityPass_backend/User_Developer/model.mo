import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Int "mo:base/Int";

module {
    // User Type
    public type User = {
        id: Principal; // Unique identifier for the user
        name: Text;    // User's name
        email: Text;   // User's email (optional)
        createdAt: Int; // Timestamp when the user was created
        updatedAt: Int; // Timestamp when the user was last updated
    };

    // Developer Type
    public type Developer = {
        id: Principal; // Unique identifier for the developer
        name: Text;    // Developer's name
        website: Text;  // Developer's website (optional)
        createdAt: Int; // Timestamp when the developer was created
        updatedAt: Int; // Timestamp when the developer was last updated
    };

    // Integration Type
    public type Integration = {
        id: Text;     // Unique identifier for the integration
        developerId: Principal; // ID of the developer who owns the integration
        apiKey: Text;  // API key for the integration
        createdAt: Int; // Timestamp when the integration was created
        updatedAt: Int; // Timestamp when the integration was last updated
    };

    // Payload for creating a User
    public type CreateUserPayload = {
        name: Text;
        email: Text;
    };

    // Payload for updating a User
    public type UpdateUserPayload = {
        name: ?Text;
        email: ?Text;
    };

    // Payload for creating a Developer
    public type CreateDeveloperPayload = {
        name: Text;
        website: Text;
    };

    // Payload for updating a Developer
    public type UpdateDeveloperPayload = {
        name: ?Text;
        website: ?Text;
    };

    // Payload for creating an Integration
    public type CreateIntegrationPayload = {
        developerId: Principal;
        apiKey: Text;
    };

    // Payload for updating an Integration
    public type UpdateIntegrationPayload = {
        developerId: ?Principal;
        apiKey: ?Text;
    };
};