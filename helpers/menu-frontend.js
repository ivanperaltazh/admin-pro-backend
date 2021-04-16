


 const getMenuFrontEnd = ( role = 'USER_ROLE' ) => {

  const menu= [
    { 
     titulo:'Dashboard',
     icono:'mdi mdi-gauge',
     submenu:[
      {titulo:'Main', url: '/'},
      {titulo:'Graficas', url: 'grafica1'},
      {titulo:'RXJS', url: 'rxjs'},
      {titulo:'Promesas', url: 'promesas'},
      {titulo:'ProgressBar', url: 'progress'},
      
     ]
    }, 

    { 
      titulo:'Matenimientos',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
    //    {titulo:'Usuarios', url: 'usuarios'},
       {titulo:'Hopitales', url: 'hospitales'},
       {titulo:'Médicos', url: 'medicos'},      
      ]
     }, 
  ]

  if(role === 'ADMIN_ROLE'){
// añadimos opcion a primera posicion de array "menu", si el usuario es 'ADMIN_ROLE' podra ver opcion titulo:'Usuarios'
     menu[1].submenu.unshift({titulo:'Usuarios', url: 'usuarios'})
  }

  return menu;

}

module.exports = {
    getMenuFrontEnd
}