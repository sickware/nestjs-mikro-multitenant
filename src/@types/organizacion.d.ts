declare global {
    var globalSchema: string
    
    interface GlobalInterface {
      value: unknown
    }
  
    type GlobalType = {
      value: unknown
    }
  }
  
  export {}