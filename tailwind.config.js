
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    //هان لما بدنا نعمل cusome color ,custome font
   
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    container: {
      center: true,
      padding: "50px"  //left
    },    
    extend: {
    //هان لما ابدنا نضيف كلاسات على المكتبة
    colors:{
      "green" :"#4B5929",
      "green-hover":"#A8C686",
      "brown":"#8B6F47",
      "orange":"#D9A066",
      "red":"#B22222",
      "nile":"#2E3A59",
      "bage":"#F5E9DA",
      "white":"#FAF7F2",
      "black":"#222222",
      
    }
    },
      
  },
  plugins: [
    
  
  ],
}

