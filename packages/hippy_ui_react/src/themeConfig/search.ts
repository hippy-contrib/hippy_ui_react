import { ThemeConfigSearch } from './types/search';
import { ThemeMode } from './index';

/**
 * Search 组件
 */
export const searchConfig: ThemeConfigSearch = {
  searchWrapPropsFn: (params) => {
    const {
      consumerValue: { theme },
    } = params;
    return {
      style: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        flex: 1,
        flexShrink: 1,
        backgroundColor: theme === ThemeMode.dark ? 'rgba(255,255,255,0.1)' : '#F8F8F8',
      },
    };
  },
  searchInputPropsFn: (params) => {
    const {
      consumerValue: { themeConfig },
    } = params;
    return {
      returnKeyType: 'search',
      multiline: false,
      placeholderTextColor: themeConfig.colorTextSecondary,
      caretColor: themeConfig.colorTheme,
      style: {
        height: 40,
        padding: 0,
        flex: 1,
        underlineColorAndroid: 'transparent',
        borderWidth: 0,
        outline: 'none',
        backgroundColor: 'transparent',
        color: themeConfig.colorTextBase,
        caretColor: themeConfig.colorTheme,
        fontSize: themeConfig.hiTextSizeDefault,
      },
    };
  },
  searchClearIconPropsFn: (params) => {
    const {
      consumerValue: { theme },
    } = params;
    return {
      source: {
        uri:
          theme === ThemeMode.dark
            ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM7SURBVHgB7ZotcxsxEIbXnYLAQMODhfkHNTQ0NAzs3+k/MHRYyhrmsrC6LKwuqlnMaubu2qv24vhu39XpPjKjZ0bjmeQ+9NzqpNVJRJlMJpPJDIYRdcDhcLjin2suYy5XWgJbLnv5HY1Ge2qZ1oRZsuCfD1zkdwyeJvIbLk8sv6EWSCqskbzRgkpWseOyYvE1JSSZMMtKNKd0aropSSreWJhFRXBGp6bbJiIs4jtqQCNhlpVmO6f0Ua1CZJcsvaVIooVZVt7TGfXDfWwTjxLuWTYQJf2OnGgz7ltWmGldXLiEtYOa03CYa51gvBGeUHcdFEIYIWBgYX1vb2h4FJoDQHgiPKHhMtUsz+Q9cpBGF23KMlZKD7qJGKdl8rCiU5IhApK5IdGT60sdH60D0QhPCGcZEn9NEBZ0eggWIrvgcx511nR8cPp3BOh1M4V11gN3VOdZkKaCC6qXDrLb0nnh72hWNda61oJEGO4QhEs3NaRfyZ7hGRXMuiLCBfmYXRobK6QrZfkax2uRT7iwDqgV1p7Pm81IBW8BaUTWOwyOrd7ainDsJB6RTi1bvnclljA0ttXcuFK6JVmhNkhtRThQKX1OIlmhUZNOgSmdUFboXThU4mJFVFb+V1AHWMIpvhPXjrOlBGNBWEbWiLaFraHniEojGRlCbWZmCUd/LCNb9rol6dogWcKxN0aSiltKLy0Xi4+wzlq8UUYzqGPvTWmlzfUppJfekI+VI6lApD39yC/rAET4iXy8moQb46wl7YmyWVdTWCfznmb9b7wVATCpuChNvu/mz8iKI5p4rAlnWhIVeTSDeiHNRWQ/Ep7efkMOgp6gTrk+ke+7lpSwAO5lo+ehshLdz8iBUIS15/tKOPJgCoqfbRXkm7hA0RXgXJqlpUPY0PD47llj8k4e7qmDfNfBMzmiK7iE9WvFktJMKpoiveKdd4HcPT3UpMLzPreByH6JWRh/iwvif7g8dLogHuhhy4O8s3e9bHkI6KebCbW/sviTTs24v00tZbSJTyh9tCWqDzosNib5TryE4r+5/OCyTrklcUhbD8PkXaZ4b2PrYRWlJZvz/HhP/1cId6MONpdmMplMJjMg/gJAfHRBUuIZ2wAAAABJRU5ErkJggg=='
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT7SURBVHgB7VpLT9tAEF5CDCQtDqVAo4pQLm0l1JIc2gOHSvwyflqFeuFQqFq1qehDqqJEUQzlEQMxwQH6TZRIIYp3Z9dOglR/Fwe8a8+3MzuPHQsRI0aMGDFi3BtMiNHAmp+fT3meZ09NTVk3NzdW9wZ+1xOJROvs7MzFn74YMoZGeHZ29rFlWU9AaGFiYsLmzLm9vXVB/q/v+w4W4EgMAVETtjKZzDII5rgkg4CF8iYnJ38cHx9XRISIjPDS0tKTZrP5ChpKiQgRNfEoCKexP/Mwx8diiMDzy6enp7/wsyFCICxhGyb8NmqtBqGj7Y/QtisMYUwYWs1h1fNiDIB/+ALSZWGASWGAcZLtIJtOpxHlPG1NJ4Q+7DGTbYNkwMJrRwJdwmnas+Ke4Pr6mmRJ68zRIjw3N/d8VA6KA5KFIoTOHPYexoOXcXkp7h/S8Nx1ZGcXnMFsDcN87iPZNpLJ5Cu6cMayNEzapXSRMxaxsoHF2a3X61/gSWv4exFzLc5czKPiYT+fz3+6uLgotVqtB3BOD1Xz6PkzMzPNy8vLU9VYFmFUOG+5QmNf7YBs+8UIG83FxcUaUs6saj6RhaZ2kE05pVLpxnXdFuYdplKpZ0w5Z0C4pBqkNGmqenQcVX8WVKlUPDxjhzQfNKdLtn/uysoKaZwVa6lYIVlV45SEYVJZoYFBL5WRDiJLgEnTfXbYoXJUNUZJGMJoFQWwhoIYEBsHkZaRXVtbE+fn53kd6+IUMCrClm5dSwIiOdkQCtIqstVqNc91lD3ICIW3ljoDCPcIBHRf2vaa09PTWTgdR/Qd25AzIkcGwtWIybaByFAlZxl0X0oYeyKDoP5UGEBFepBQYckSKDRh7wc6OqlJQ7uhjmlk5t2PKMgSsMhSkzaplrTAIR0VWQK2ijTeD50wAd4ziWwtcOX39/dJyKEeEXWhMunQ58Qyb9zF1taWr0pOooL0iAdp3TJy1IIwBIdsL3K5XArn0Rswba0atxdXV1cfkYc7QfelGgbZM2EIVZwdRKpcLnthNY2o0pLdlxI+OTkxejEnqbBteyOINO4Zk0bIq8vuq5yWT+0PoQFuBkXeewikiay5hgkI4lo9HhD5yc2gOKRxj+04MVYpq5IwHlITGkA9+6f/f7I4KyON/ejBwjzBBJTjqMYoCVMXT8esQeBOvOUkFUGkUS0JLiBjA/tXqWHWiQfStQSEWWKOnV5YWHCQaJADsRAmXnMyKMq9cbKSxXhndXWV/ACFmBdYDFYuj3FFzsE8t9VCbdB3eCgrPnZ6QA2YmI0r62jojlDYi9AYzeP2lRvYSu85Y7mppQ/hvzPHtk2UinETsoROIc8uXMhRssdyByJ7qXG84KiBxano9I61igcU159Hke9yQaaMzOyHzhztdmmngbXR2WNjBSzug26vWLtdSicVKCqu8FPrNDNqdHrEh0ITRv1hcv/UnxVjIE2pK5zhN9OGeKhPHsi8saffhCnndEB7Fh55N8wnD0Ya7oLMG0lGDQnCVNjPlFSAZo+Qje06jsPqEgYhss+WqOEGbb+IWtukVWRgxYODA2WezEEoDfeC9jWOSP9gbzcgpM1tvkng4jm/C4XC12KxaHwQ0Y9hf3pIuTFdWeaOprYLbR4hq6txCgETjOTj0s3NzeTe3l6GPirtPeuGt/VxUO8jzLnr6+uN7e3tlogRI0aMGDH+H/wDIE3PlsonTxEAAAAASUVORK5CYII=',
      },
      style: {
        marginLeft: 6,
        backgroundColor: 'transparent',
        width: 20,
        height: 20,
        cursor: 'pointer',
      },
      accessible: true,
      accessibilityLabel: '清空 按钮',
    };
  },
  searchLeftIconPropsFn: (params) => {
    const {
      consumerValue: { theme },
    } = params;
    return {
      source: {
        uri:
          theme === ThemeMode.dark
            ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMgSURBVHgB7Zkts+owEIZfUEgkshJ5JbLyyCOP5Cfcn3Ml8kgkEolEIiORlXXc7HTLLe1uPkoCvTPnmemUoW2ybzbZJBvgh/cyQyZut9uSf9az2axGJpIIsMYW9kbXiq+l8NrVXiTkYi9jRV2RgNECrNELe9vwtUA8lb2OaMRUGEm0gASG9yHjz1bEESOIEsBd5RNyF3kWErKL9UawAGs8tfgH8nOM8UaQAGt8aW9lwKvUehe+13ynbkYeW3UuH8EivAICjCdDT2j6sdf9HF5LNFHL1RWDRMw8lZVwG3/iiqLjfEfIL8drB1v2yfFcF8AV/FYek8HftnCDJ7H1rNGMLc0bf1xzxhw6W+X/igs1SIAth8bMjsuV+HJ9LwrgriO1yKhQ54PL26HxbJ8l2yMyEMBdR+uXh9TGt3C5e+XxhifQAZIHCsitf2Z3Z4PLPwuPyHixUSUBJWSOeA0HyF1pLb38IMC6SVtJnnN1nT4ckiUvFJ0l+p2+BwrIOGNxBrSuOvBCiIAq1do9FA7RUjcaLEP6ArSNyDswwn//lQBpzA1C6dz3AvQZMjdSvd5BPCWCFohTFhC0Xe0LENcieA/aWuyBue8FhO2gciDV6xUgRZwC70ESMLCvL8AIHy04G/EyuD5pDHgFaFP4Bq9FW86b/h8PAnghZYQP19JCKgeO/YiYwZPCqLQSJD7xGrR6RLsGAqxKelGKRgUnt7LBW8dCeFSxXQO0ieyo/P+Ra0BzdqJEnD2yAFZrlG++Uovo5FwljNb6hGspQRtsaWam8LZ1ZQpi4G65hb6Q3Lu+92XmKBq4Bi/F5e8x201u9RLuiZK2suMFcEUl/IndCwKyFpwaWcFveBdnjjR1dpowaFzf9Uqbnab7mEMRVUTM+YAvh5kbUUTsCQ0ZTyLWSI9Bk/2gMad5aSBi1CEfD+4SabxBgeDQJos5N7VFoIinjllZyBrxHqHwfGVjjFCuT8Su/S7VOTFVVODfWfECw8rJYBrYBs3kVHvKdIm4eyHbSX0KHCL27ew85U09OCO4w2NIpv/u882kPdDC0Y+8Uac6GZoMfwFJDSm5kldBTgAAAABJRU5ErkJggg=='
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATRSURBVHgB7VrfTxpLFB7RBVkVoqjoDc0NL21y78MlN95EX+5D//S++NI0No1NSlKblE2lKogoICxivy+RpsycHRbZXdukX0LcnZ0f5/ecOaNSv/G0WFQxYXd3111bW3Nubm74OlIxYUFFABBayGQyBTzmfN/PpVIpV+9zf3/fRrt/d3dXX1xcbDSbzbaKAPMw4GxubpYHg0EZBDlqRoxGox7GfQAjTbx21SPxGAbmIlwHGXEcp3ZxcVFVj8BMDNBUYAYV/LIqYpCRq6urQzWjNkIzAOKfLy0tPVcxA1qtzqKNUFEoLPGQYhfa8fD3S7/f/4KmTzC1BtoaeB4Mh0MSmLHNAWcvrK6uqm6321AhMFUD04hHVPGx6Ccs6p2enk5Vf6lUyiK0vsCYDSlajRFWE1YNTCN+YWHhpFKpvK5Wq+cgylch0G63h7e3t/Wtra06tJPGHDmpHzWRz+f9TqfTss1n04C7vr7+UvrwIPXX19fXodRsw8rKyg6E9FeQNsDgK9uekQr6AO4PpHbaeS6XexUF8QQkXIemDzmv9B3C+s82XjQhmg5scEdv5yJczPO8nooQNCuaFJz8mU4TNODYnFrSgAt1PpM6I104jpr4MTgvItdb6RsEV8afJembwcAGIG1UsHnv7Ozsq4oRNCeuo8y1HZi0KFSDAdjcC6kj1PhBJYBWq3UMszEimmTSxAQDiDr5IOnHZToCfIRXSQsFpuh6+wQDsLUNYUIFpk5UgoAG6lI7HLmot+kmVNA7MPJElbuHBUO0ZEZoy+ttKa2DoSKkuokSPwZ80QiboG9Nb5tgQLJ/hLanYsDwOVhDWm+bYIDhSu+AzSUp550Aoo6xM0sCDkwlnhqIRKGSw5+WgXQ6Heq4qjuxwTUyxciPj2EAHzACCo+deltqWgfkP2K+HjegAWNd0S+09yu9A5gy9oaEIAnOoE+PQkbIZGRiNUIlCK4nRUTAoG+CAZQ1PGEQzaisEgRMpSS1u65rbG66CflwZKMTHIqZYOABPGK4oMFInUmXlFBKYbQmtPGc8I9KAJZ1RLoMBpC4eVI4ZTpbLBZjNSUeZbmO3v6QUIrmHbSRHUuN2B3/jsuht7e3i0ElHNaIgsaJh/per9eGw5BQV5hsJ5vNnqNPX0UECgV+9i9yHYMe5GINBJf3QWMDUwkwcBRgSg5+/6NCHUmdFGfdMiR/IFW6aTr4fmQbH1iZY6kDkh7gUTyL0laXl5d3UGU7x2uoxOtHUOo4Z1cgpD8t3eooJHi2eaylRZoSDjRMY0W7x+IZMFkGITk83+F2pqPs4Ka4TsIxJzVoDc08gU0r9IYqr89SWme8hjn0oJnveQs05fLqCSaRfcyliK3QG/p+YFoNM24EMRH6lhISvGH5D5JdAROrKmIw2rDyB9/alugKujeY6ZqVjs2LC0SoLsyBdj/3HRkTSITQN6hEVFGZ6zBEY94/VEgm5rpmxbZfguR2od7iLOMeyvPMLKtSlRvzMpU+CMhIqa3D8bi5LroZpaiR/f39k1qt1oKP9DH5CAQOGZVAgD/+QWNNMHqO3fzj3t7eMS5FPuO5FzBv36YJHrx4dcXnSC6640KQJsDY0Tg3iu1fDaLAWBOQ+NbY32h6l5eX79SvBF4MMownfTJMBN8AMQmFAQ2NBysAAAAASUVORK5CYII=',
      },
      style: {
        backgroundColor: 'transparent',
        width: 16,
        height: 16,
        marginRight: 6,
      },
    };
  },
};
