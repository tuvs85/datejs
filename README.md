[datejs gitHub链接](https://github.com/tuvs85/datejs)
### datejs Api
#### format
>格式化时间，为最后链，如果不传指定格式为原对象返回。
>
>YYYY 年
>
>MM 月
>
>DD 日
>
>hh 小时
>
>mm 分钟
>
>ss 秒
>
>SSS 毫秒
>
```javascript
window.dateJs(new Date().getTime()).format('YYYY-MM-DD hh-mm-ss');
```

####  toZone
> 转换时间到指定时区，默认认为东八区为正时区 因此需要反推  -8 为正 8 
```javascript
window.dateJs(new Date().getTime()).toZone(12).format('YYYY-MM-DD hh-mm-ss');
```

#### stamp
> 返回当前时间的时间戳

#### add
> 添加指定时间
> day  天
>
> hour 小时
>
> minute 分钟
>
> second 秒速
>
```javascript
window.dateJs(new Date().getTime()).add(12);
window.dateJs(new Date().getTime()).add({hour:12, minute: 12});

```
