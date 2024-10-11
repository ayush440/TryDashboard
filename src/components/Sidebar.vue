<template>
  <div class="sidebar">
    <div class="logo text-black font-bold">
      <img src=" " alt="" />
      <span>Logo Here </span>
    </div>
    <nav>
      <div class="bg-[#5847f7] transition-all duration-300 rounded-lg text-white">
        <router-link to="/" class="nav-item active cursor-pointer">
          <i class="icon-home"></i>
          <span class="text-white">Home</span>
        </router-link>
      </div>
      
      <div class="hover:bg-[#5847f7] transition-all duration-300 rounded-lg hover:text-white cursor-pointer">
        <router-link to="/strategy" class="nav-item">
          <i class="icon-strategy"></i>
          <span>Strategy</span>
        </router-link>
      </div>

      <div class="hover:bg-[#5847f7] transition-all duration-300 rounded-lg hover:text-white cursor-pointer">
        <router-link to="/broker" class="nav-item">
          <i class="icon-broker"></i>
          <span>Broker</span>
        </router-link>
      </div>
     
      <div class="hover:bg-[#5847f7] transition-all duration-300 rounded-lg hover:text-white cursor-pointer">
        <router-link to="/orders" class="nav-item">
          <i class="icon-orders"></i>
          <span>Orders</span>
        </router-link>
      </div>
     
      <div class="hover:bg-[#5847f7] transition-all duration-300 rounded-lg hover:text-white cursor-pointer">
        <router-link to="/positions" class="nav-item">
          <i class="icon-positions"></i>
          <span>Positions</span>
        </router-link>
      </div>

      <div class="hover:bg-[#5847f7] transition-all duration-300 rounded-lg hover:text-white cursor-pointer">
        <router-link to="/tutorials" class="nav-item">
          <i class="icon-tutorials"></i>
          <span>Tutorials</span>
        </router-link>
      </div>
    </nav>
    <!-- Rest of the sidebar content -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showUserMenu = ref(false)

const refreshData = () => {
  // Implement refresh logic
}

const logout = () => {
  // Implement logout logic
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: white;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  color: grey;
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.nav-item:hover {
  color: white;
}

.user-profile {
  margin-top: auto;
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-menu-dropdown {
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>