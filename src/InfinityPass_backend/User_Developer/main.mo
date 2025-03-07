import UserDeveloperModel "./model";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Int "mo:base/Int";

actor Dashboard {
    // Stable storage for upgrades
    private stable var usersEntries : [(Principal, UserDeveloperModel.User)] = [];
    private stable var developersEntries : [(Principal, UserDeveloperModel.Developer)] = [];
    private stable var integrationsEntries : [(Text, UserDeveloperModel.Integration)] = [];

    // Mutable state
    private var users = HashMap.fromIter<Principal, UserDeveloperModel.User>(
        usersEntries.vals(),
        0,
        Principal.equal,
        Principal.hash
    );

    private var developers = HashMap.fromIter<Principal, UserDeveloperModel.Developer>(
        developersEntries.vals(),
        0,
        Principal.equal,
        Principal.hash
    );

    private var integrations = HashMap.fromIter<Text, UserDeveloperModel.Integration>(
        integrationsEntries.vals(),
        0,
        Text.equal,
        Text.hash
    );

    // Upgrade hooks
    system func preupgrade() {
        usersEntries := Iter.toArray(users.entries());
        developersEntries := Iter.toArray(developers.entries());
        integrationsEntries := Iter.toArray(integrations.entries());
    };

    system func postupgrade() {
        users := HashMap.fromIter<Principal, UserDeveloperModel.User>(
            usersEntries.vals(),
            0,
            Principal.equal,
            Principal.hash
        );
        developers := HashMap.fromIter<Principal, UserDeveloperModel.Developer>(
            developersEntries.vals(),
            0,
            Principal.equal,
            Principal.hash
        );
        integrations := HashMap.fromIter<Text, UserDeveloperModel.Integration>(
            integrationsEntries.vals(),
            0,
            Text.equal,
            Text.hash
        );
    };

    // ====== User CRUD ======
    public shared ({ caller }) func createUser(payload: UserDeveloperModel.CreateUserPayload) : async Result.Result<UserDeveloperModel.User, Text> {
        let timestamp = Time.now();
        let user : UserDeveloperModel.User = {
            id = caller;
            name = payload.name;
            email = payload.email;
            createdAt = timestamp;
            updatedAt = timestamp;
        };
        users.put(caller, user);
        #ok(user);
    };

    public query func getUser(userId: Principal) : async Result.Result<UserDeveloperModel.User, Text> {
        switch (users.get(userId)) {
            case (?user) { #ok(user) };
            case null { #err("User not found") };
        }
    };

    public shared ({ caller }) func updateUser(payload: UserDeveloperModel.UpdateUserPayload) : async Result.Result<UserDeveloperModel.User, Text> {
        switch (users.get(caller)) {
            case (?existingUser) {
                let updatedUser : UserDeveloperModel.User = {
                    id = existingUser.id;
                    name = Option.get(payload.name, existingUser.name);
                    email = Option.get(payload.email, existingUser.email);
                    createdAt = existingUser.createdAt;
                    updatedAt = Time.now();
                };
                users.put(caller, updatedUser);
                #ok(updatedUser);
            };
            case null { #err("User not found") };
        }
    };

    public func deleteUser(userId: Principal) : async Result.Result<(), Text> {
        switch (users.get(userId)) {
            case (?_) { 
                users.delete(userId);
                #ok(());
            };
            case null { #err("User not found") };
        }
    };

    // ====== Developer CRUD ======
    public shared ({ caller }) func createDeveloper(payload: UserDeveloperModel.CreateDeveloperPayload) : async Result.Result<UserDeveloperModel.Developer, Text> {
        let developer : UserDeveloperModel.Developer = {
            id = caller;
            name = payload.name;
            website = payload.website;
            createdAt = Time.now();
            updatedAt = Time.now();
        };
        developers.put(caller, developer);
        #ok(developer);
    };

    public query func getDeveloper(developerId: Principal) : async Result.Result<UserDeveloperModel.Developer, Text> {
        switch (developers.get(developerId)) {
            case (?developer) { #ok(developer) };
            case null { #err("Developer not found") };
        }
    };

    // ====== Integration CRUD ======
public func createIntegration(payload: UserDeveloperModel.CreateIntegrationPayload) : async Result.Result<UserDeveloperModel.Integration, Text> {
    let integrationId = generateIntegrationId(payload.developerId);
    let now : Int = Time.now();
    let integration : UserDeveloperModel.Integration = {
        id = integrationId;
        developerId = payload.developerId;
        apiKey = payload.apiKey;
        createdAt = now;
        updatedAt = now;
    };
    integrations.put(integrationId, integration);
    #ok(integration);
};

private func generateIntegrationId(developerId: Principal) : Text {
    let timestamp = Int.toText(Time.now()); // Directly use Int.toText
    let devId = Principal.toText(developerId);
    timestamp # "-" # devId;
};


    public query func getIntegration(integrationId: Text) : async Result.Result<UserDeveloperModel.Integration, Text> {
        switch (integrations.get(integrationId)) {
            case (?integration) { #ok(integration) };
            case null { #err("Integration not found") };
        }
    };

    // ====== Additional Queries ======
    public query func getAllUsers() : async [UserDeveloperModel.User] {
        Iter.toArray(users.vals());
    };

    public query func getIntegrationsByDeveloper(developerId: Principal) : async [UserDeveloperModel.Integration] {
        Iter.toArray(Iter.filter<UserDeveloperModel.Integration>(
            integrations.vals(),
            func(integration) { integration.developerId == developerId }
        ));
    };
};