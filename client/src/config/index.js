export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: ' Enter your user name',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: ' Enter your email',
        componentType: 'input',
        type: 'email',
    }, {
        name: 'password',
        label: 'Password',
        placeholder: ' Enter your password',
        componentType: 'input',
        type: 'password',
    }
]

export const loginFormControls = [
   
    {
        name: 'email',
        label: 'Email',
        placeholder: ' Enter your email',
        componentType: 'input',
        type: 'email',
    }, {
        name: 'password',
        label: 'Password',
        placeholder: ' Enter your password',
        componentType: 'input',
        type: 'password',
    }
]

export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "bestSeller", label: "Bestseller" },
        { id: "traSua", label: "Trà Sữa" },
        { id: "caPhe", label: "Cà Phê" },
        { id: "banhNgot", label: "Bánh Ngọt" },
        { id: "daXay", label: "Đá Xay" },
      ],
    },
    {
      label: "Size",
      name: "size",
      componentType: "select",
      options: [
        { id: "S", label: "Size S" },
        { id: "M", label: "Size M" },
        { id: "L", label: "Size L" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "bestSeller",
      label: "Best Seller",
      path: "/shop/listing?category=bestSeller",
    },
    {
      id: "traSua",
      label: "Trà Sữa",
      path: "/shop/listing?category=traSua",
    },
    {
      id: "caPhe",
      label: "Cà Phê",
      path: "/shop/listing?category=caPhe",
    },
    {
      id: "daXay",
      label: "Đá Xay",
      path: "/shop/listing?category=daXay",
    },
    {
      id: "banhNgot",
      label: "Bánh Ngọt",
      path: "/shop/listing?category=banhNgot",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];

  export const shoppingViewFooterMenuItems = [
    
  
    {
      id: "bestSeller",
      label: "Best Seller",
      path: "/shop/listing?category=bestSeller",
    },
    {
      id: "traSua",
      label: "Trà Sữa",
      path: "/shop/listing?category=traSua",
    },
    {
      id: "caPhe",
      label: "Cà Phê",
      path: "/shop/listing?category=caPhe",
    },
    {
      id: "daXay",
      label: "Đá Xay",
      path: "/shop/listing?category=daXay",
    },
    {
      id: "banhNgot",
      label: "Bánh Ngọt",
      path: "/shop/listing?category=banhNgot",
    },
  ];

  export const filterOptions = {
    category: [
      { id: "bestSeller", label: "Best Seller" },
      { id: "traSua", label: "Trà Sữa" },
      { id: "caPhe", label: "Cà Phê" },
      { id: "banhNgot", label: "Bánh Ngọt" },
      { id: "daXay", label: "Đá Xay" },
    ],
    // size: [
    //   { id: "S", label: "Size S" },
    //   { id: "M", label: "Size M" },
    //   { id: "L", label: "Size L" },
    // ],
  };

  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Tăng dần" },
    { id: "price-hightolow", label: "Price: Giảm dần" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];

  export const categoryOptionsMap = {
    bestSeller: "bestSeller",
    traSua: "traSua",
    caPhe: "caPhe",
    banhNgot: "banhNgot",
    daXay: "daXay",
  };

  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];