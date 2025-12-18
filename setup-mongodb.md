# 🗄️ MongoDB Setup Guide

## Option A: Local MongoDB (Quick Setup)

### **Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Choose "Run service as Network Service user"
4. Leave port as default (27017)

### **macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### **Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option B: MongoDB Atlas (Cloud - Production Ready)

### **Steps:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project
4. Build a database:
   - Choose the free tier (M0)
   - Region: Choose closest to you
   - Cluster name: `glam-essence`
5. Create database user:
   - Username: `glam_user`
   - Password: Generate strong password
6. Add IP address:
   - Choose "Allow access from anywhere" (0.0.0.0/0) for testing
7. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### **Update .env.local:**
```env
MONGODB_URI=mongodb+srv://glam_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/glam-essence?retryWrites=true&w=majority
```

## ✅ Verify Installation

After setting up MongoDB, test the connection:
```bash
# For local MongoDB
mongosh --eval "db.runCommand({ connectionStatus: 1 })"

# Should show: "ok" : 1