package com.ecommerce.exception.Handler;


import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

//brings the exception object to this class
@ControllerAdvice
public class GlobalExceptionsHander {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handeResourceNotFountException(ResourceNotFoundException e, WebRequest request) {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<?> handeAuthenticationException(UnauthorizedException e, WebRequest request) {
        return new ResponseEntity<>("Could not validate credentials", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception exception, WebRequest request){
        ErrorMsg errMsg=new ErrorMsg(new Date(),exception.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(errMsg, HttpStatus.BAD_REQUEST);
    }
}