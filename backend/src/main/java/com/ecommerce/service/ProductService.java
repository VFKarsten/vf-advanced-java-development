package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Service
public class ProductService {

    private static final String FOLDER_PATH="/Users/karstenhecker/ws/images/";

    @Autowired
    private ProductRepo repo;

    public String addProduct(String name, String price, MultipartFile file) throws IOException {
        File directory=new File(FOLDER_PATH);
        if(!directory.exists()){
            directory.mkdirs();
        }

        File destinationFile=new File(directory, file.getOriginalFilename());
        file.transferTo(destinationFile);
        Product product=new Product();
        product.setName(name);
        product.setPrice(price);
        product.setImagePath(file.getOriginalFilename());
        repo.save(product);
            return "Product uploaded successfully";
        }


    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public byte[] getProductImage(String name)throws IOException {
        File imageFile=new File(FOLDER_PATH+name);
        if(!imageFile.exists()){
            throw new IOException("Image is not found in the location");
        }
        return Files.readAllBytes(imageFile.toPath());
    }
}

