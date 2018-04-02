
package com.ciandt.includeday7.backend.model;

import java.io.Serializable;
import java.util.List;

import com.google.appengine.repackaged.com.google.gson.annotations.Expose;
import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;

public class ComputerVisionOut implements Serializable
{

    @SerializedName("metadata")
    @Expose
    private Metadata metadata;
    @SerializedName("color")
    @Expose
    private Color color;
    @SerializedName("requestId")
    @Expose
    private String requestId;
    @SerializedName("description")
    @Expose
    private Description description;
    @SerializedName("categories")
    @Expose
    private List<Category> categories = null;
    private final static long serialVersionUID = -975380643217290955L;

    public Metadata getMetadata() {
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public Description getDescription() {
        return description;
    }

    public void setDescription(Description description) {
        this.description = description;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

}
