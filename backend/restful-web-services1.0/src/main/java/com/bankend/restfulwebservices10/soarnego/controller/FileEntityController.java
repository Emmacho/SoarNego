package com.bankend.restfulwebservices10.soarnego.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.bankend.restfulwebservices10.soarnego.model.FileEntity;
import com.bankend.restfulwebservices10.soarnego.repository.FileEntityRepository;
import java.util.*;
//@RestController
//@CrossOrigin(maxAge = 3600, allowCredentials = "true")
//@RequestMapping("/api/save/files")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class FileEntityController {

	@Autowired
	FileEntityRepository fileEntityRepository;

	// @CrossOrigin(origins="http://localhost:4200", allowedHeaders =
	// {"Requestor-Type", "Authorization"}, exposedHeaders = "X-Get-Header")
	@PostMapping("/save/files")
	public ResponseEntity<FileEntity> createFileEntity(@RequestBody FileEntity fileEntity) {
		// HttpHeaders headers = new HttpHeaders();
		// headers.set("X-Get-Header", "ExampleHeader");
		FileEntity _fileEntity = fileEntityRepository
				.save(new FileEntity(fileEntity.getFileName(), fileEntity.getFileContent()));
		return new ResponseEntity<FileEntity>(_fileEntity, HttpStatus.CREATED);

	}

	// @GetMapping("/find/files/index")
	// public ResponseEntity<FileEntity> findFileIdIndex(@RequestBody FileEntity
	// fileEntity) {
	//
	// FileEntity _fileEntity = fileEntityRepository
	// .save(new FileEntity(fileEntity.getFileName(), fileEntity.getFileContent()));
	// return new ResponseEntity<FileEntity>(_fileEntity, HttpStatus.CREATED);
	//

	// }
	@PutMapping("/update/files/{id}")
	public ResponseEntity<FileEntity> updateFileEntity(@PathVariable("id") Long id, @RequestBody FileEntity fileEntity) {
		
		Optional<FileEntity> fileEntityData = fileEntityRepository.findById(id);

		if (fileEntityData.isPresent()) {
			FileEntity _fileEntity = fileEntityData.get();
			_fileEntity.setFileName(fileEntity.getFileName());
			_fileEntity.setFileContent(fileEntity.getFileContent());
			FileEntity updatedFileEntity = fileEntityRepository.save(_fileEntity);
			return new ResponseEntity<>(updatedFileEntity, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/find/files/{id}")
	public ResponseEntity<FileEntity> getFileEntityById(@PathVariable("id") long id) {
		Optional<FileEntity> fileEntityData = fileEntityRepository.findById(id);

		if (fileEntityData.isPresent()) {
			FileEntity foundFileEntity = fileEntityData.get();
			return new ResponseEntity<>(foundFileEntity, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping("/get/all-files")
	public ResponseEntity<List<FileEntity>> getAllFileEntities() {
		List<FileEntity> fileEntities = new ArrayList<>();
		fileEntityRepository.findAll().forEach(fileEntities::add);
	
		if (fileEntities.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(fileEntities, HttpStatus.OK);
		}
	}
	
}
