# 用户表 User

| 名称 | 类型 | 意思  | 是否为空 |默认|
| --- | --- | --- | --- | --|
| user_id | string | 用户ID | 否 ||
| phone | string | 电话号码 | 否 ||
| name | string | 用户名 | 是 |XXX-ID|
|sex|int|性别|否|
|admission_time|string|入学年份|否||
|photo|string|头像|是|默认头像|

# 商品表 Good

| 名称 | 类型 | 意思  | 是否为空 |
| --- | --- | --- | --- |
| good_id | string | 商品ID | 否 |
| name | string | 商品名 | 否 |
| img | list | 图片列表 | 是 |
| price | float | 商品价格 | 否 |
| degree | float | 商品新旧程度 | 时 |
| type | choice（string） | 商品类型（衣服、数码等） | 是 |
|discription|string|商品描述|时|
| create_time | datetime | 商品创建时间 | 否 |
| view | int | 被浏览起次数 | 否 |
| like | int | 被喜爱次数 | 否 |
| user | User | 用户的外键（指向某个用户） | 否 |
| sold | boolean | 是否售卖 | 否 |
| sold_time | datetime | 售出时间 | 否 |

# 评论 Comment

| 名称 | 类型 | 意思  | 是否为空 |
| --- | --- | --- | --- |
| good | Good | 商品外键 | 否 |
| comment | string | 评论 | 否 |
| comment_pid | Comment | 评论父节点 | 是 |
| timestamp | datetime | 评论时间戳 | 否 |

# 喜爱商品 CollectionGood

| 名称 | 类型 | 意思  | 是否为空 |
| --- | --- | --- | --- |
| good | Good | 商品外键 | 否 |
| user | User | 用户的外键（指向某个用户） | 否 |