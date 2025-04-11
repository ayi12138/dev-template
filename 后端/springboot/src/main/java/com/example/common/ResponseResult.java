package com.example.common;

import lombok.Data;

/**
 * @ClassName：ResponseResult
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/5 2:53
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Data
public class ResponseResult<T> {
    private Integer code;
    private String msg;
    private T data;
    private Long timestamp = System.currentTimeMillis();
    public static<T> ResponseResult<T> success(T data) {
        ResponseResult<T> ResponseResult = new ResponseResult<>();
        ResponseResult.setCode(200);
        ResponseResult.setMsg("success");
        ResponseResult.setData(data);
        return ResponseResult;
    }
    public static<T> ResponseResult<T> success() {
        ResponseResult<T> ResponseResult = new ResponseResult<>();
        ResponseResult.setCode(200);
        ResponseResult.setMsg("success");
        return ResponseResult;
    }

    public static<T> ResponseResult<T> error() {
        ResponseResult<T> ResponseResult = new ResponseResult<>();
        ResponseResult.setCode(500);
        ResponseResult.setMsg("系统异常");
        return ResponseResult;
    }
    public static<T> ResponseResult<T> error(int code, String msg) {
        ResponseResult<T> ResponseResult = new ResponseResult<>();
        ResponseResult.setCode(code);
        ResponseResult.setMsg(msg);
        return ResponseResult;
    }
}
