package com.example.exception;

import lombok.Data;

/**
 * @ClassName：自定义异常,运行时
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/5 3:50
 * @Description: 必须描述类做什么事情, 实现什么功能
 */

@Data
public class CustomerException extends RuntimeException{
    private int code;
    private String msg;

    public CustomerException(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
    public CustomerException(String msg) {
        this.code = 500;
        this.msg = msg;
    }
    public CustomerException() {

    }
}
