export function isCheckoutRoute(): boolean {
  return window.location.pathname === '/checkout' || 
         window.location.search.includes('method=delivery');
}