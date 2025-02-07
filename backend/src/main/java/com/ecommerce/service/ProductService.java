package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private static final String FOLDER_PATH="/Users/karstenhecker/ws/images/";

    @Autowired
    private ProductRepo repo;

    public String addProduct(String name, String price, MultipartFile file) throws IOException {
        prepareProductFile(file);
        Product product=new Product(null, name, price, file.getOriginalFilename());

        repo.save(product);
            return "Product uploaded successfully";
        }

    public String updateProduct(Long id, String name, String price, MultipartFile file) throws IOException {
        Product product=new Product(id, name, price, null);

        if (file == null) {
            // no file provided => look for filename in current database product
            Optional<Product> originalProduct = repo.findById(id);
            // Only update the imagepath, if a product with the given id exists!
            originalProduct.ifPresent(value -> product.setImagePath(value.getImagePath()));
        }
        else {
            // new image provided
            prepareProductFile(file); // save image to filesystem
            product.setImagePath(file.getOriginalFilename()); // set image path in current filesystem.
        }


        repo.save(product);
        return "Product uploaded successfully";
    }

    private void prepareProductFile(MultipartFile file) throws IOException {
        File directory=new File(FOLDER_PATH);
        if(!directory.exists()){
            directory.mkdirs();
        }

        File destinationFile=new File(directory, file.getOriginalFilename());
        file.transferTo(destinationFile);
    }

    public List<Product> getAllProducts() {

        return repo.findAll();
    }

    public byte[] getProductImage(String name)throws IOException {
        if (name.equals("null"))
            return null;

        File imageFile=new File(FOLDER_PATH+name);
        if(!imageFile.exists()){
            throw new IOException("Image is not found in the location");
        }
        return Files.readAllBytes(imageFile.toPath());
    }

    public void deleteById(Long id) {

        repo.deleteById(id);
    }
}

