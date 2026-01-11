<script setup lang="ts">
const { columnHeader, content } = useTechStack()
</script>

<template>
  <SectionWrapper class="bg-base-200/30" title="Tech Stack" containerClass="max-w-6xl">
    <template #description>
      The technology that I used to build products.
    </template>
      
      <!-- Desktop View -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="w-full table-fixed">
          <thead>
            <tr>
              <th v-for="header in columnHeader" :key="header" class="text-lg font-bold pb-4 border-l border-base-300 first:border-l-0">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in content" :key="rowIndex"> <!-- Assumption: Max 4 rows based on max items in a category, dynamic calculation would be better but this suffices for static data structure -->
                 <td v-for="(category, catIndex) in content" :key="catIndex" class="align-top border-l border-base-300 first:border-l-0">
                    <div v-if="Object.values(category)[rowIndex]" class="flex flex-col items-center gap-2 mb-2 p-2 rounded-lg hover:bg-base-200 transition-colors">
                        <Icon v-if="Object.values(category)[rowIndex].icon" :name="Object.values(category)[rowIndex].icon" class="text-4xl" />
                         <img v-else-if="Object.values(category)[rowIndex].source" :src="Object.values(category)[rowIndex].source" class="w-6 h-6" :alt="Object.values(category)[rowIndex].label"/>
                        <span class="text-sm">{{ Object.values(category)[rowIndex].label }}</span>
                    </div>
                 </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile View -->
      <div class="lg:hidden space-y-8">
        <div v-for="(category, index) in content" :key="index" class="bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 class="text-xl font-bold mb-4 border-b pb-2">{{ columnHeader[index] }}</h3>
           <div class="flex flex-wrap gap-3">
              <div v-for="(item, key) in category" :key="key" class="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-full text-sm">
                  <Icon v-if="item.icon" :name="item.icon" class="text-lg" />
                   <img v-else-if="item.source" :src="item.source" class="w-5 h-5" :alt="item.label"/>
                  <span>{{ item.label }}</span>
              </div>
           </div>
        </div>
      </div>

  </SectionWrapper>
</template>
