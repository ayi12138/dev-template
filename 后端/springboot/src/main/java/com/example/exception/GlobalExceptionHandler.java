package com.example.exception;

import com.example.common.ResponseResult;
import com.example.exception.GlobalExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @ClassName：GlobalException
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/5 3:31
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@ControllerAdvice("com.example.controller")
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseResult<String> error(Exception e) {
        log.error("系统异常",e);
        return ResponseResult.error();
    }
    @ExceptionHandler(CustomerException.class)
    @ResponseBody
    public ResponseResult<String> error(CustomerException e) {
        log.error("自定义异常",e);
        return ResponseResult.error(e.getCode(),e.getMsg());
    }
}
