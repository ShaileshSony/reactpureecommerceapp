// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductByFilter(filter, sort, pagination) {
  console.log(filter);
  // filter = {"category": ["beauty","furniture", "...."], "brand": ["essence"]}
  // sort = {_sort:"rating", _order: "desc"}
  // pagination = {_page : 1, _limit : 10}
  let queryString = "";
  // for (let key in filter) {
  //   queryString += `${key}=${filter[key]}&`;
  //   console.log(queryString);
  // }
  for (let key in filter) {
    const categoryValues = filter[key]
    if(categoryValues.length>0){
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
    // else{
    //   queryString = ''
    // }
    console.log("categoryValues....", categoryValues)
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
    console.log(queryString);
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
    console.log(queryString);
  }
  console.log(queryString);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/products?" + queryString
    );
    console.log("response....",response)
    const data = await response.json();
    const totalItems = await response.headers.get('x-total-count');
    
    resolve({ data: {products:data, totalItems: +totalItems} });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/brands");
    const data = await response.json();
    resolve({ data });
  });
}