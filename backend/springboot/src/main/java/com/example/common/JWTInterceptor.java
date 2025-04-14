package com.example.common;

import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.entity.User;
import com.example.exception.CustomerException;
import com.example.service.UserService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * @ClassName：JWTInterceptor
 * @Author: 阿姨洗铁路
 * @Date: 2025/4/11 19:50
 * @Description: 必须描述类做什么事情, 实现什么功能
 */
@Component
public class JWTInterceptor implements HandlerInterceptor {
    @Resource UserService userService;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        请求头中获取token
        String token = request.getHeader("token");

//        从参数里获取token
        if (StrUtil.isEmpty(token)) {
            token = request.getParameter("token");
        }
        if (StrUtil.isBlank(token)) {
            throw new CustomerException(401,"你无权限操作");
        }
        User user = null;
        try {
            //        载荷
            String audience = JWT.decode(token).getAudience().getFirst();
            String[] split = audience.split("-");
            String userId = split[0];
            String role = split[1];

            user = userService.selectById(Integer.parseInt(userId));

        }catch (Exception e){
            throw new CustomerException(401,"你无权限操作");
        }
        if(user == null){
            throw new CustomerException(401,"你无权限操作");
        }
        try {
            //        加签
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
//        验证签名
            jwtVerifier.verify(token);

        }catch (Exception e){
            throw new CustomerException(401,"你无权限操作");
        }
        return true;
    }
}
