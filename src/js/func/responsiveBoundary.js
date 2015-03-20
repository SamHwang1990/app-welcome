/**
 * Created by sam on 15-3-20.
 */

define('responsiveBoundary',[] , function(){
  var XS = 480, SM = 768, MD = 992, LG = 1200;
  return {
    xs: XS,
    xsMin: XS,
    xsMax: SM -1,
    sm: SM,
    smMin: SM,
    smMax: MD -1,
    md: MD,
    mdMin: MD,
    mdMax: LG -1,
    lg: LG,
    lgMin: LG
  };
});