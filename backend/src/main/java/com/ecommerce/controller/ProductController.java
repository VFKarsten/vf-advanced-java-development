package com.ecommerce.controller;


import com.ecommerce.model.Product;
import com.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService service;

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestParam("name") String name, @RequestParam("price") String price, @RequestParam("image") MultipartFile file) throws IOException {
        String response = service.addProduct(name, price, file);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    //update the product
    @PostMapping(path="/update/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestParam("name") String name, @RequestParam("price") String price, @RequestParam("image") MultipartFile file) throws IOException {
        String response = service.updateProduct(id, name, price, file);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products=service.getAllProducts();
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @GetMapping("/image/{name}")
    public ResponseEntity<byte[]> getproductbyname(@PathVariable String name) throws IOException {
        byte[] imagedata=service.getProductImage(name);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_JPEG).body(imagedata);
    }

    //delete the product
    @DeleteMapping(path = "/byProductId/{id}")
    public String deleteById(@PathVariable("id") Long id){
        service.deleteById(id);
        return "Delete by id called";
    }

}
