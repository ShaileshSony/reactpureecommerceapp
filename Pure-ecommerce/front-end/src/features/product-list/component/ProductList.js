import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllBrandsAsync,
  fetchAllCategoriesAsync,
  fetchAllProductAsync,
  fetchProductByFilterAsync,
  selectAllProducts,
} from "../productSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { fetchAllProduct } from '../productAPI'

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ITEM_PER_PAGE } from "../../../app/constant";
import { fetchAllCategories } from "../productAPI";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const oldProducts = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

const items = [
  {
    id: 1,
    name: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    name: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    name: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

export default function ProductList() {
  const totalItems = useSelector(state=> state.product.totalItems);
  const categories = useSelector(state=> state.product.category)
  const brands = useSelector(state=> state.product.brand)
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [newPage, setNewPage] = useState(1);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];
  

  // const limit = 1;

  // const filterHandler = (e, section, option) => {
  //   console.log(e.target.checked);
  //   const newFilter = {...filter}
  //   if(e.target.checked){
  //     newFilter[section.id].push(option.value);
  //   }else{
  //     delete newFilter[section.id]
  //   }
  //   // const newFilter = { ...filter, [section.id]: option.value };
  //   setFilter(newFilter);
  //   dispatch(fetchProductByFilterAsync(newFilter));
  // };

  //
  //----- second method to filter handling -----//
  const filterHandler = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex((e) => e === option.value);
      newFilter[section.id].splice(index, 1);
    }
    console.log("newFilter....", newFilter);
    setFilter(newFilter);
    dispatch(fetchProductByFilterAsync(newFilter));
  };
  //---- filter handling method end ----//

  const sortHandler = (e, option) => {
    console.log(option.sort);
    setSort({ _sort: option.sort, _order: option.order });
  };
  const pageHandler = (e, page) => {
    console.log(page);
    setNewPage(page);
  };
  console.log("filter....", filter);

  useEffect(() => {
    // dispatch(fetchAllProductAsync());
    const pagination = { _page: newPage, _limit: ITEM_PER_PAGE };
    dispatch(fetchProductByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, newPage]);


  useEffect(()=>{
    setNewPage(1)
  }, [totalItems, sort])

  useEffect(()=>{
   dispatch(fetchAllCategoriesAsync())
   dispatch(fetchAllBrandsAsync())
  }, [dispatch])

  return (
    <div className="">
      {/* left side filter area start */}
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog start */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filterHandler={filterHandler}
            filters={filters}
          />
          {/* Mobile filter dialog end */}

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                {/* sorting start  */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <p
                            onClick={(e) => sortHandler(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                            )}
                          >
                            {option.name}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                {/* sorting end  */}
                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* desktop Filters */}
                <DesktopFilter filterHandler={filterHandler} filters={filters} />
                {/* desktop Filters */}

                {/* Product grid start here */}
                <div className="lg:col-span-3">
                  {/* product list html template */}
                  <ProductGrid products={products} />
                  {/* product list html template end */}
                </div>
                {/* Product grid end here */}
              </div>
            </section>

            {/* pagination section start */}
            <Pagination
              newPage={newPage}
              setNewPage={setNewPage}
              pageHandler={pageHandler}
              totalItems={totalItems}
              filters={filters}
            />
            {/* pagination section end  */}
          </main>

        </div>
      </div>
      {/* left side filter area end */}
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filterHandler,
  filters
}) {
  return (
    <>
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}-${option.value}`}
                            type="checkbox"
                            onChange={(e) => filterHandler(e, section, option)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
function DesktopFilter({ filterHandler,filters }) {
  return (
    <>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>
        {filters.map((section) => (
          <Disclosure
            key={section.id}
            as="div"
            className="border-b border-gray-200 py-6"
          >
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="h-5 w-5 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      defaultValue={option.value}
                      defaultChecked={option.checked}
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}-${option.value}`}
                      type="checkbox"
                      onChange={(e) => filterHandler(e, section, option)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </form>
    </>
  );
}
function Pagination({ newPage, setNewPage, pageHandler, totalItems, filters }) {
  let totalPages = +Math.ceil(totalItems / ITEM_PER_PAGE)
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(newPage - 1) * ITEM_PER_PAGE + 1}
              </span>{" "}
              to <span className="font-medium">{newPage * ITEM_PER_PAGE > totalItems ? totalItems : newPage * ITEM_PER_PAGE }</span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <div
                onClick={(e)=> pageHandler(newPage > 1 ? newPage - 1 : newPage)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

              {Array.from({
                length: totalPages
              }).map((el, index) => (
                <div
                  onClick={(e) => pageHandler(e, index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer z-10 inline-flex items-center 
                  ${index + 1 === newPage
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400"
                  } px-4 py-2 text-sm font-semibold
                   focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              ))}
              <div
                onClick={(e)=> pageHandler(newPage < totalPages ? newPage + 1 : newPage)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
function ProductGrid({ products }) {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Latest Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Link
                to="/productdetail"
                key={product.id}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={product.name}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm flex items-center gap-1 text-gray-500">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      {product.rating}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm  text-gray-500 line-through">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
