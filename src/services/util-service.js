export class UtilService {

  counter = 1;  

  /**
   * This function generates a query string to be attached
   * to a URI. It returns an encoded URI string with values
   * corresponding the the searchCriteria object passed in.
   */
  generateQueryString(searchCriteria) {
    let params = [];
    // ?n=John&n=Susan    
    Object.keys(searchCriteria).forEach((k, i) => {
      if (searchCriteria[k]) {
        params.push(`${k}=${searchCriteria[k]}`);
      }
    });
    let sub = params.join('&');
    let result = `?${encodeURIComponent(sub)}`;
    console.log('QueryString: ', result);
    return result;
  }

  /**
   * This function parses the query string from a 
   * window.location.hash. It returns a hydrated
   * searchParams object containing a property
   * per query string parameter. 
   */
  parseQueryString() {
    // ?n=John&n=Susan    
    const hash = decodeURIComponent(window.location.hash);
    if (hash.indexOf('?') > 1) {
      const qs = hash.substring(hash.indexOf('?') + 1);
      const pairs = qs.split('&');
      const queryParams = {};
      pairs.forEach(p => {
        const kv = p.split('=');
        console.log('kv', kv);
        queryParams[kv[0]] = kv[1];
      });
      return queryParams;
    }
    return null;
  }

parseQueryStringUrl() {
    // ?n=John&n=Susan    
    const hash = decodeURIComponent(window.location.hash);
      console.log('hash', hash);
     if (hash.indexOf('?') > 1) {
      //  const qs = '?'+hash.substring(hash.indexOf('?') + 1);
      const qs = hash.substring(hash.indexOf('?') );
      return qs
     }
   return null;
  }


}