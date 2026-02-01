# Category & Sub-Category System Documentation

## Overview
This document explains the Category and Sub-Category system used in the FD MAKAN real estate website. The system provides a hierarchical organization structure for properties.

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Data Structure](#data-structure)
3. [API Endpoints](#api-endpoints)
4. [Database Collections](#database-collections)
5. [Functionality & Logic](#functionality--logic)
6. [Integration with Properties](#integration-with-properties)
7. [Usage Examples](#usage-examples)

---

## System Architecture

### Hierarchical Structure
```
Main Category (Level 1)
    └── Sub Category (Level 2)
            └── Properties (belong to both)
```

### Current Status
- **Categories System**: Available but currently replaced by **Developers** system
- **Properties**: Now use `developer` field instead of `mainCategory`/`subCategory`
- **Category APIs**: Still functional and can be used for future features

---

## Data Structure

### Main Category Schema
```typescript
interface MainCategory {
  _id: ObjectId;                    // MongoDB ObjectId
  name: string;                      // Category name (e.g., "Residential", "Commercial")
  image?: string;                    // Category image URL (optional)
  mainUse: string;                   // Always "property" for property categories
  createdAt: Date;                   // Creation timestamp
  updatedAt: Date;                   // Last update timestamp
}
```

### Sub Category Schema
```typescript
interface SubCategory {
  _id: ObjectId;                      // MongoDB ObjectId
  name: string;                      // Sub-category name (e.g., "Apartments", "Villas")
  mainCategory: string;               // Parent main category name (must exist)
  image?: string;                    // Sub-category image URL (optional)
  createdAt: Date;                   // Creation timestamp
  updatedAt: Date;                   // Last update timestamp
}
```

### Property Schema (with Categories)
```typescript
interface Property {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  
  // Category Fields (Legacy - replaced by developer)
  mainCategory?: string;             // Main category name
  subCategory?: string;              // Sub-category name
  category?: string;                  // Hierarchical format: "MainCategory/SubCategory"
  
  // Current System
  developer: string;                  // Developer name (replaces categories)
  
  location: string;
  // ... other fields
}
```

---

## API Endpoints

### Main Categories

#### GET `/api/categories/main`
**Description**: Fetch all main categories

**Response**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Residential",
    "image": "https://example.com/residential.jpg",
    "mainUse": "property",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Logic**:
- Queries `main_categories` collection
- Filters by `mainUse: 'property'`
- Returns all matching categories

---

#### POST `/api/categories/main`
**Description**: Create a new main category

**Request Body**:
```json
{
  "name": "Residential",
  "image": "https://example.com/residential.jpg"
}
```

**Validation**:
- `name` is required (non-empty string)
- `image` is optional

**Response**:
```json
{
  "success": true,
  "category": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Residential",
    "image": "https://example.com/residential.jpg",
    "mainUse": "property",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Logic**:
- Validates required fields
- Sets `mainUse: 'property'` automatically
- Adds `createdAt` and `updatedAt` timestamps
- Inserts into `main_categories` collection

---

#### DELETE `/api/categories/main/[id]`
**Description**: Delete a main category

**Parameters**:
- `id`: MongoDB ObjectId of the category

**Response**:
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Logic**:
- Validates ObjectId format
- Deletes category from `main_categories` collection
- **Note**: Does not delete associated sub-categories (manual cleanup may be needed)

---

### Sub Categories

#### GET `/api/categories/sub`
**Description**: Fetch sub categories (optionally filtered by main category)

**Query Parameters**:
- `mainCategory` (optional): Filter by main category name

**Example**:
- `/api/categories/sub` - Returns all sub categories
- `/api/categories/sub?mainCategory=Residential` - Returns only Residential sub categories

**Response**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Apartments",
    "mainCategory": "Residential",
    "image": "https://example.com/apartments.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Logic**:
- If `mainCategory` query param provided: Filters by `mainCategory` field
- Otherwise: Returns all sub categories
- Queries `sub_categories` collection

---

#### POST `/api/categories/sub`
**Description**: Create a new sub category

**Request Body**:
```json
{
  "name": "Apartments",
  "mainCategory": "Residential",
  "image": "https://example.com/apartments.jpg"
}
```

**Validation**:
- `name` is required (non-empty string)
- `mainCategory` is required (must match existing main category)
- `image` is optional

**Response**:
```json
{
  "success": true,
  "category": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Apartments",
    "mainCategory": "Residential",
    "image": "https://example.com/apartments.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Logic**:
- Validates required fields (`name` and `mainCategory`)
- **Note**: Does not validate if `mainCategory` exists (should be added)
- Adds `createdAt` and `updatedAt` timestamps
- Inserts into `sub_categories` collection

---

#### PUT `/api/categories/sub/[id]`
**Description**: Update a sub category

**Parameters**:
- `id`: MongoDB ObjectId of the sub category

**Request Body**:
```json
{
  "name": "Luxury Apartments",
  "mainCategory": "Residential",
  "image": "https://example.com/luxury-apartments.jpg"
}
```

**Logic**:
- Updates `updatedAt` timestamp
- Updates specified fields in `sub_categories` collection

---

#### DELETE `/api/categories/sub/[id]`
**Description**: Delete a sub category

**Parameters**:
- `id`: MongoDB ObjectId of the sub category

**Response**:
```json
{
  "success": true,
  "message": "Sub category deleted successfully"
}
```

**Logic**:
- Validates ObjectId format
- Deletes sub category from `sub_categories` collection
- **Note**: Does not update properties using this sub category (manual cleanup may be needed)

---

## Database Collections

### `main_categories`
**Purpose**: Stores main category data

**Indexes** (Recommended):
- `name`: Unique index (prevents duplicate category names)
- `mainUse`: Index for filtering

**Example Document**:
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Residential",
  "image": "https://example.com/residential.jpg",
  "mainUse": "property",
  "createdAt": ISODate("2024-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00.000Z")
}
```

---

### `sub_categories`
**Purpose**: Stores sub category data linked to main categories

**Indexes** (Recommended):
- `mainCategory`: Index for filtering
- `name`: Index for search
- Compound: `{ mainCategory: 1, name: 1 }`: Unique constraint per main category

**Example Document**:
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "name": "Apartments",
  "mainCategory": "Residential",
  "image": "https://example.com/apartments.jpg",
  "createdAt": ISODate("2024-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00.000Z")
}
```

---

## Functionality & Logic

### 1. Category Creation Flow

#### Main Category Creation:
```
1. Admin enters category name and optional image
2. Frontend sends POST request to /api/categories/main
3. API validates name is provided
4. API sets mainUse: 'property' automatically
5. API adds createdAt and updatedAt timestamps
6. API inserts into main_categories collection
7. Returns success response with created category
```

#### Sub Category Creation:
```
1. Admin selects main category from dropdown
2. Admin enters sub-category name and optional image
3. Frontend sends POST request to /api/categories/sub
4. API validates name and mainCategory are provided
5. API adds createdAt and updatedAt timestamps
6. API inserts into sub_categories collection
7. Returns success response with created sub category
```

---

### 2. Category Filtering Logic

#### Fetching Sub Categories by Main Category:
```typescript
// Query parameter: ?mainCategory=Residential
const query = { mainCategory: "Residential" };
const subCategories = await db.collection('sub_categories').find(query).toArray();
```

**Use Case**: When displaying sub-categories in a dropdown after selecting a main category.

---

### 3. Hierarchical Category String

**Format**: `"MainCategory/SubCategory"`

**Example**: `"Residential/Apartments"`

**Usage**: Stored in property's `category` field for easy filtering and display.

**Logic**:
```typescript
const categoryString = `${mainCategory}/${subCategory}`;
// Result: "Residential/Apartments"
```

---

### 4. Category Validation Rules

#### Main Category:
- ✅ Name must be unique
- ✅ Name cannot be empty
- ✅ Image URL is optional
- ✅ `mainUse` is automatically set to `"property"`

#### Sub Category:
- ✅ Name must be provided
- ✅ `mainCategory` must be provided
- ✅ `mainCategory` should exist in `main_categories` collection (validation recommended)
- ✅ Image URL is optional
- ⚠️ Same sub-category name can exist under different main categories

---

## Integration with Properties

### Current System (Developers)
Properties now use `developer` field instead of categories:
```typescript
{
  developer: "ABC Developers",  // Single developer assignment
  // mainCategory and subCategory are optional/legacy
}
```

### Legacy System (Categories)
Properties can still use category fields:
```typescript
{
  mainCategory: "Residential",
  subCategory: "Apartments",
  category: "Residential/Apartments"  // Hierarchical format
}
```

### Property Filtering by Category

#### Filter by Main Category:
```typescript
const properties = await db.collection('properties')
  .find({ mainCategory: "Residential" })
  .toArray();
```

#### Filter by Sub Category:
```typescript
const properties = await db.collection('properties')
  .find({ subCategory: "Apartments" })
  .toArray();
```

#### Filter by Both:
```typescript
const properties = await db.collection('properties')
  .find({ 
    mainCategory: "Residential",
    subCategory: "Apartments"
  })
  .toArray();
```

#### Filter by Hierarchical String:
```typescript
const properties = await db.collection('properties')
  .find({ category: "Residential/Apartments" })
  .toArray();
```

---

## Usage Examples

### Example 1: Create Category Hierarchy

```typescript
// Step 1: Create Main Category
const mainCategoryResponse = await fetch('/api/categories/main', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Residential',
    image: 'https://example.com/residential.jpg'
  })
});

// Step 2: Create Sub Categories
const subCategory1 = await fetch('/api/categories/sub', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Apartments',
    mainCategory: 'Residential',
    image: 'https://example.com/apartments.jpg'
  })
});

const subCategory2 = await fetch('/api/categories/sub', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Villas',
    mainCategory: 'Residential',
    image: 'https://example.com/villas.jpg'
  })
});
```

---

### Example 2: Fetch Categories for Dropdown

```typescript
// Fetch Main Categories
const mainCategories = await fetch('/api/categories/main')
  .then(res => res.json());

// Fetch Sub Categories for selected Main Category
const subCategories = await fetch(`/api/categories/sub?mainCategory=${selectedMainCategory}`)
  .then(res => res.json());

// Use in dropdown
<select>
  {mainCategories.map(cat => (
    <option key={cat._id} value={cat.name}>{cat.name}</option>
  ))}
</select>
```

---

### Example 3: Filter Properties by Category

```typescript
// Get all properties in Residential/Apartments category
const properties = await fetch('/api/properties')
  .then(res => res.json())
  .then(data => data.filter(p => 
    p.mainCategory === 'Residential' && 
    p.subCategory === 'Apartments'
  ));
```

---

### Example 4: Display Category Breadcrumb

```typescript
// Property has: { mainCategory: "Residential", subCategory: "Apartments" }
const breadcrumb = `${property.mainCategory} > ${property.subCategory}`;
// Result: "Residential > Apartments"
```

---

## Best Practices

### 1. Category Naming
- Use clear, descriptive names
- Avoid special characters
- Use consistent capitalization (e.g., Title Case)

### 2. Category Hierarchy
- Keep main categories broad (e.g., "Residential", "Commercial")
- Keep sub categories specific (e.g., "2BHK Apartments", "3BHK Apartments")

### 3. Data Integrity
- Validate `mainCategory` exists before creating sub category
- Handle orphaned sub categories (main category deleted)
- Consider cascade delete or reassignment

### 4. Performance
- Index `mainCategory` field in `sub_categories` collection
- Index `name` field in both collections for search
- Use compound indexes for common queries

### 5. Error Handling
- Check if main category exists before creating sub category
- Handle duplicate category names gracefully
- Validate image URLs before saving

---

## Migration Notes

### From Categories to Developers
The system was migrated from categories to developers:
- **Old**: Properties had `mainCategory` and `subCategory`
- **New**: Properties have `developer` field
- **Category APIs**: Still functional but not actively used for properties
- **Future Use**: Categories can be used for property types or other classifications

---

## API Error Responses

### 400 Bad Request
```json
{
  "error": "Category name is required",
  "message": "Category name is required"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create category",
  "message": "Database connection error"
}
```

---

## File Locations

### API Routes
- `app/api/categories/main/route.ts` - Main category endpoints
- `app/api/categories/main/[id]/route.ts` - Main category by ID
- `app/api/categories/sub/route.ts` - Sub category endpoints
- `app/api/categories/sub/[id]/route.ts` - Sub category by ID

### Database Collections
- `main_categories` - Main categories collection
- `sub_categories` - Sub categories collection

---

## Summary

The Category & Sub-Category system provides:
- ✅ Hierarchical organization structure
- ✅ Flexible filtering and search capabilities
- ✅ RESTful API endpoints for CRUD operations
- ✅ Integration with property management
- ✅ Scalable architecture for future enhancements

**Current Status**: System is functional but properties now use Developers instead of Categories. Category system can be repurposed for property types, locations, or other classification needs.

---

**Last Updated**: 2024-12-02
**Version**: 1.0


