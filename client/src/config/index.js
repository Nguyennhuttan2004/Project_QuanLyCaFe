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
    label: "Tên sản phẩm",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tên sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả sản phẩm",
  },
  {
    label: "Danh mục",
    name: "category",
    componentType: "select",
    options: [
      { id: "bestSeller", label: "Bán chạy nhất" },
      { id: "traSua", label: "Trà Sữa" },
      { id: "caPhe", label: "Cà Phê" },
      { id: "banhNgot", label: "Bánh Ngọt" },
      { id: "daXay", label: "Đá Xay" },
    ],
  },
  {
    label: "Kích thước",
    name: "size",
    componentType: "select",
    options: [
      { id: "S", label: "Size S" },
      { id: "M", label: "Size M" },
      { id: "L", label: "Size L" },
    ],
  },
  {
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Giá khuyến mãi",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá khuyến mãi (không bắt buộc)",
  },
  {
    label: "Tổng số lượng",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập tổng số lượng",
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
      id: "aboutUs",
      label: "About Us",
      path: "/shop/about",
    },
    {
      id: "contact",
      label: "Contact",
      path: "/shop/contact",
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
      // { id: "bestSeller", label: "Best Seller" },
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


